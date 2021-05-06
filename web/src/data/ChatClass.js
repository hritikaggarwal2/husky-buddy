export class ChatClass {
  constructor(
    content,
    owner,
    time
  ) {
    this.content = content;
    this.owner = owner;
    this.time = time;
  }
}
    
// Firestore data converter
export let ChatClassConverter = {
  toFirestore: function (ChatClass) {
    return {
      content: ChatClass.content,
      owner: ChatClass.owner,
      time: ChatClass.time
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new ChatClass(
      data.content,
      data.owner,
      data.time
    );
  },
};