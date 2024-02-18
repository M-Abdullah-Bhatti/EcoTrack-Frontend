const getColor = (val) => {
  if (val <= 200) {
    return "#40916c";
  } else if (val > 200 && val <= 500) {
    return "#A7C957";
  } else {
    return "#BC4749";
  }
};
export const EmissionData = {
  Electricity: [
    { value: 250, label: "Jan", frontColor: getColor(250) },
    { value: 500, label: "Feb", frontColor: getColor(500) },
    { value: 745, label: "March", frontColor: getColor(745) },
    { value: 320, label: "April", frontColor: getColor(320) },
    { value: 600, label: "May", frontColor: getColor(600) },
    { value: 256, label: "June", frontColor: getColor(256) },
    { value: 300, label: "July", frontColor: getColor(300) },
  ],
  Food: [
    { value: 210, label: "Jan", frontColor: getColor(210) },
    { value: 400, label: "Feb", frontColor: getColor(400) },
    { value: 445, label: "March", frontColor: getColor(445) },
    { value: 620, label: "April", frontColor: getColor(620) },
    { value: 300, label: "May", frontColor: getColor(300) },
    { value: 556, label: "June", frontColor: getColor(556) },
    { value: 100, label: "July", frontColor: getColor(100) },
  ],
  Transport: [
    { value: 250, label: "Jan", frontColor: getColor(250) },
    { value: 500, label: "Feb", frontColor: getColor(500) },
    { value: 745, label: "March", frontColor: getColor(745) },
    { value: 320, label: "April", frontColor: getColor(320) },
    { value: 600, label: "May", frontColor: getColor(600) },
    { value: 256, label: "June", frontColor: getColor(256) },
    { value: 300, label: "July", frontColor: getColor(300) },
  ],
};
