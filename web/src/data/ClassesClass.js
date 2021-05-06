export class ClassesClass {
  constructor(
    name,
    num,
    prefix
  ) {
    this.name = name;
    this.num = num;
    this.prefix = prefix;
  }
}
  
// Firestore data converter
export let ClassesClassConverter = {
  toFirestore: function (ClassesClass) {
    return {
      name: ClassesClass.name,
      num: ClassesClass.num,
      prefix: ClassesClass.prefix
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new ClassesClass(
      data.name,
      data.num,
      data.prefix
    );
  },
};