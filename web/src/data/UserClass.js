export class UserClass {
  constructor(
    first_name,
    last_name,
    email,
    date_of_birth,
    language,
    time_zone,
    country,
    personal_phone,
    join_date,
    status,
    isVerified,
    image,
    major
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.date_of_birth = date_of_birth;
    this.language = language;
    this.time_zone = time_zone;
    this.country = country;
    this.personal_phone = personal_phone;
    this.join_date = join_date;
    this.status = status;
    this.isVerified = isVerified;
    this.image = image;
    this.major = major;
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
      language: UserClass.language,
      time_zone: UserClass.time_zone,
      country: UserClass.country,
      personal_phone: UserClass.personal_phone,
      join_date: UserClass.join_date,
      status: UserClass.status,
      isVerified: UserClass.isVerified,
      image: UserClass.image,
      major: UserClass.major,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new UserClass(
      data.first_name,
      data.last_name,
      data.email,
      data.date_of_birth,
      data.language,
      data.time_zone,
      data.country,
      data.personal_phone,
      data.join_date,
      data.status,
      data.isVerified,
      data.image,
      data.major
    );
  },
};
