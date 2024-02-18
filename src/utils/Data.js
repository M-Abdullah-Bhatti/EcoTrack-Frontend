import { AntDesign } from "@expo/vector-icons";

export const posts = [
    {
      username: "Murtaza Khan",
      timestamp: "2 hours ago",
      description:
        "Hey Earth champions! 🌍✨ Let's talk carbon footprints today,those invisible but impactful steps we leave on our planetHey Earth champions! 🌍✨ Let's talk carbon footprints today—those invisible but impactful steps we leave on our planet",
      mediaUploaded: [
        require("../../assets/t2.jpg"),
        require("../../assets/t2.jpg"),
      ],
      totalLikes: 20,
      totalComments: 5,
      totalShares: 1,
      userPic: require("../../assets/murtaza.jpg"),
      likesByUsers: [
        { username: "Abdullah Khan" },
        { username: "Rizwan Ahmed" },
        { username: "Raza Abbas" },
        { username: "Ali Haider" },
      ],
    },
    {
      username: "Rizwan Ahmed",
      timestamp: "5 min ago",
      description: "",
      mediaUploaded: [
        require("../../assets/texture.png"),
        require("../../assets/t2.jpg"),
      ],
      totalLikes: 11,
      totalComments: 5,
      totalShares: 1,
      userPic: require("../../assets/rizwan.jpg"),
      likesByUsers: [
        { username: "Abdullah Khan" },
        { username: "Rizwan Ahmed" },
        { username: "Raza Abbas" },
        { username: "Ali Haider" },
        { username: "Ali Haider" },
        { username: "Ali Haider" },
        { username: "Ali Haider" },
        { username: "Ali Haider" },
        { username: "Ali Haider" },
        { username: "Ali Haider" },
        { username: "Ali Haider" },
      ],
    },
    {
      username: "Shayan Askari",
      timestamp: "1 hour ago",
      description: "",
      mediaUploaded: [
        require("../../assets/texture.png"),
        require("../../assets/t2.jpg"),
      ],
      totalLikes: 0,
      totalComments: 5,
      totalShares: 1,
      userPic: require("../../assets/shayan.jpg"),
      likesByUsers: [],
    },
];

export const stories = [
    {
      user: "LoggedIn",
      icon: <AntDesign name="plus" size={18} color="white" />,
      story: require("../../assets/t2.jpg"),
    },
    {
      user: "Rizwan",
      pic: require("../../assets/rizwan.jpg"),
      story: require("../../assets/t2.jpg"),
    },
    {
      user: "Murtaza",
      pic: require("../../assets/murtaza.jpg"),
      story: require("../../assets/texture.png"),
    },
    {
      user: "Abdullah",
      pic: require("../../assets/abdullah.jpg"),
      story: require("../../assets/texture.png"),
    },
    {
      user: "Shayan",
      pic: require("../../assets/shayan.jpg"),
      story: require("../../assets/texture.png"),
    },
];