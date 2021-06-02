// Node Modules
import { useState, useEffect, useRef } from "react";

// Firebase
import { useUser } from "../providers/UserProvider";
import firebase from "firebase/app";
import "firebase/firestore";

// Components
import PageContainer from "../components/PageContainer";
import CreateGroup from "../components/CreateGroupPopUp";
import MyGroupPanel from "../components/MyGroupPanel";
import ImageButton from "../components/ImageButton";

// Assets
import addImg from "../assets/add.png";
// import sortLine from "../assets/sortLine.svg";
// import sortBox from "../assets/sortBox.svg";

export default function Dashboard() {
  const [openCreate, setOpenCreate] = useState(false);
  const user = useUser().user;

  const selectRef = useRef();

  const [sortOn, setSortOn] = useState("group_name");

  const [myGps, setMyGps] = useState([]);
  const [allGps, setGps] = useState([]);

  const [searchGps, setSearchGps] = useState(null);
  const [groupToShow, setGroupToShow] = useState(null);

  const [searchInput, setSearchInput] = useState("");

  // Retrieve the values of the user groups
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("Groups")
      .where("members", "array-contains", user.uwid)
      .onSnapshot(
        {
          // Listen for document metadata changes
          includeMetadataChanges: true,
        },
        (snapshot) => {
          console.log("firebase  2");
          let allGroups = [];
          snapshot.docs.forEach((doc) => {
            allGroups.push({ ...doc.data(), id: doc.id });
          });
          setMyGps(allGroups);

          if (searchGps === null) {
            setGroupToShow(allGroups);
          }
          console.log("firebase call");
        }
      );

    return () => {
      unsubscribe();
    };
    // XXX : don't add other dependancies. It will run into an infinite loop and thus
    // kill/exhaust firebase.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Retrieve the values of all the groups in the database
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("Groups")
      .onSnapshot(
        {
          // Listen for document metadata changes
          includeMetadataChanges: true,
        },
        (snapshot) => {
          console.log("firebase call 3");
          let allGroups = [];
          snapshot.docs.forEach((doc) => {
            if (doc.data().members.includes(user.uwid)) {
              return;
            }

            allGroups.push({ ...doc.data(), id: doc.id });
          });
          setGps(allGroups);
          console.log("firebase call");
        }
      );

    return () => {
      unsubscribe();
    };
  }, [user]);

  //
  function sortChange(e) {
    setSortOn(e.target.value);
  }

  function search(text) {
    let searchSt = text.trim().toLowerCase().split(" ");
    let searchGp = allGps;

    // checks if the user is just adding more search data or not. If the user is just adding data then filter on older groups that have been filtered before.
    if (searchGps && text.includes(searchGps.text)) {
      searchGp = searchGps.groups;
    }

    searchGp.forEach((group) => {
      // Change everything to Lowercase String
      let class_num = group.class_num.toString().toLowerCase();
      let class_prefix = group.class_prefix.toString().toLowerCase();
      let class_section = group.class_section.toString().toLowerCase();
      let group_name = group.group_name.toString().toLowerCase();
      let max_members = group.max_members.toString().toLowerCase();
      let topic = group.topic.toString().toLowerCase();

      let score = 0;
      searchSt.forEach((term) => {
        score += class_num.includes(term) ? 1 : 0;
        score += class_prefix.includes(term) ? 1 : 0;
        score += class_section.includes(term) ? 1 : 0;
        score += group_name.includes(term) ? 1 : 0;
        score += max_members.includes(term) ? 1 : 0;
        score += topic.includes(term) ? 1 : 0;
      });

      group.score = score;
    });

    searchGp = searchGp.filter((group) => group.score > 0);
    searchGp = searchGp.sort((a, b) => {
      return a.score - b.score;
    });

    setSearchGps({ groups: searchGp, text: text });
    setSortOn("score");
    setTimeout(() => {
      selectRef.current.value = "score";
    }, 0);
    setGroupToShow(searchGp);
  }

  function searchTextUpdate(text) {
    setSearchInput(text.replace(/[^0-9,a-z, _]/gi, ""));

    if (text.length === 0) {
      setGroupToShow(myGps);
      setSearchGps(null);
    } else {
      search(text);
    }
  }

  return (
    <>
      {openCreate ? (
        <CreateGroup open={openCreate} close={() => setOpenCreate(false)} />
      ) : null}
      <PageContainer
        index={0}
        chat={{ isChat: false }}
        search={{
          input: searchInput,
          set: searchTextUpdate,
          text: "Explore New Groups",
        }}
      >
        <div className="dashboard container d-flex col justify-center align-center">
          <div className="cover d-flex row justify-between align-center">
            <div className="d-flex row align-center">
              <h2>{searchGps === null ? "Your" : "Active"} Groups</h2>
              <div className="vLine"></div>

              <ImageButton
                onClick={() => setOpenCreate(true)}
                alt="Create Group"
                text="Create Group"
                src={addImg}
              />
            </div>

            <div className="d-flex row justify-end align-center">
              <label htmlFor="sort">SORT BY</label>
              <div className="select">
                <select
                  defaultValue="group_name"
                  onChange={sortChange}
                  name="sort"
                  id="sort"
                  ref={selectRef}
                >
                  <option value="group_name">Name</option>
                  <option value="max_members">Max Members</option>
                  <option value="class_prefix">Class Prefix</option>
                  <option value="class_num">Class Num</option>
                  {searchGps !== null ? (
                    <option value="score">Search Score</option>
                  ) : null}
                </select>
              </div>
            </div>
          </div>
          <MyGroupPanel
            isSearch={searchGps !== null}
            sort={sortOn}
            groups={groupToShow !== null ? groupToShow : []}
          />
        </div>
      </PageContainer>
    </>
  );
}
