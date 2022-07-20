const dateFormat = (d: Date) => {
  return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`.replace(/\n|\r/g, '');
}
export default dateFormat;