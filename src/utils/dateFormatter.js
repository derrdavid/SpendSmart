const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  

export default function monthToString(date){
    const index = date.date.$d.getMonth();
    return months[index];
}