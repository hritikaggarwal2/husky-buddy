export class ChatClass {
  constructor(content, owner, ownerId, time) {
    this.content = content;
    this.owner = owner;
    this.ownerId = ownerId;
    this.time = time;
  }
}

// Firestore data converter
export let ChatClassConverter = {
  toFirestore: function (ChatClass) {
    return {
      content: ChatClass.content,
      owner: ChatClass.owner,
      ownerId: ChatClass.ownerId,
      time: ChatClass.time,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new ChatClass(data.content, data.owner, data.ownerId, data.time);
  },
};
