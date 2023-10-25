export default function formatBirthday(birthday_date) {
  const currYear = new Date().getFullYear().toString().slice(2);

  const birthdayDatesArr = birthday_date.split("-");

  const birthday = `${birthday_date.padStart(
    birthday_date.length + 2,
    birthdayDatesArr.at(0) > currYear ? "19" : "20"
  )}`;

  return birthday;
}
