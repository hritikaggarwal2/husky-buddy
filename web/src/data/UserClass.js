export class UserClass {
  constructor(
    display_name,
    email,
    date_of_birth,
    groups,
    personal_phone,
    join_date,
    status,
    image,
    major,
    about,
    uwid
  ) {
    this.display_name = display_name;
    this.email = email;
    this.date_of_birth = date_of_birth;
    this.groups = groups;
    this.personal_phone = personal_phone;
    this.join_date = join_date;
    this.status = status;
    this.image = image;
    this.major = major;
    this.about = about;
    this.uwid = uwid;
  }
}

// Firestore data converter
export let UserClassConverter = {
  toFirestore: function (UserClass) {
    return {
      display_name: UserClass.display_name,
      email: UserClass.email,
      date_of_birth: UserClass.date_of_birth,
      groups: UserClass.groups,
      personal_phone: UserClass.personal_phone,
      join_date: UserClass.join_date,
      status: UserClass.status,
      image: UserClass.image,
      major: UserClass.major,
      about: UserClass.about,
      uwid: UserClass.uwid,
    };
  },
  fromFirestore: function (snapshot, options) {
    let data = null;
    if (options === null) {
      data = snapshot.data();
    } else {
      data = snapshot.data(options);
    }
    return new UserClass(
      data.display_name,
      data.email,
      data.date_of_birth,
      data.groups,
      data.personal_phone,
      data.join_date,
      data.status,
      data.image,
      data.major,
      data.about,
      data.uwid
    );
  },
};
