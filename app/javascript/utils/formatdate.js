function FormatDate(date) {
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let newDate = new Date(date)
  newDate = months[newDate.getMonth()] + ' ' + newDate.getDate() + ', ' + newDate.getFullYear() + ' ' + newDate.toLocaleTimeString()
  return newDate
}

export default FormatDate