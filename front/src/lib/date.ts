function getFormatedDate(dateString: string): string {
  const date = new Date(Date.parse(dateString));
  const formatted = date.toLocaleString();
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${date.getFullYear()}`;
}

export default getFormatedDate;
