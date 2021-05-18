export class GroupClass {
  constructor(
    class_num,
    class_prefix,
    class_section,
    group_name,
    max_members,
    meet,
    members,
    owner,
    topic
  ) {
    this.class_num = class_num;
    this.class_prefix = class_prefix;
    this.class_section = class_section;
    this.group_name = group_name;
    this.max_members = max_members;
    this.meet = meet;
    this.members = members;
    this.owner = owner;
    this.topic = topic;
  }
}
  
// Firestore data converter
export let GroupClassConverter = {
  toFirestore: function (GroupClass) {
    return {
      class_num: GroupClass.class_num,
      class_prefix: GroupClass.class_prefix,
      class_section: GroupClass.class_section,
      group_name: GroupClass.group_name,
      max_members: GroupClass.max_members,
      meet: GroupClass.meet,
      members: GroupClass.members,
      owner: GroupClass.owner,
      topic: GroupClass.topic
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new GroupClass(
      data.class_num,
      data.class_prefix,
      data.class_section,
      data.group_name,
      data.max_members,
      data.meet,
      data.members,
      data.owner,
      data.topic
    );
  },
};
  