export class UserClass {
  constructor(
    first_name,
    last_name,
    email,
    date_of_birth,
    personal_phone,
    join_date,
    isVerified,
    image,
    major,
    about
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.date_of_birth = date_of_birth;
    this.personal_phone = personal_phone;
    this.join_date = join_date;
    this.isVerified = isVerified;
    this.image = image;
    this.major = major;
    this.about = about;
  }
}

// Firestore data converter
export let UserClassConverter = {
  toFirestore: function (UserClass) {
    return {
      first_name: UserClass.first_name,
      last_name: UserClass.last_name,
      email: UserClass.email,
      date_of_birth: UserClass.date_of_birth,
      personal_phone: UserClass.personal_phone,
      join_date: UserClass.join_date,
      status: UserClass.status,
      image: UserClass.image,
      major: UserClass.major,
      about: UserClass.about,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new UserClass(
      data.first_name,
      data.last_name,
      data.email,
      data.date_of_birth,
      data.personal_phone,
      data.join_date,
      data.isVerified,
      data.image,
      data.major,
      data.about
    );
  },
};
