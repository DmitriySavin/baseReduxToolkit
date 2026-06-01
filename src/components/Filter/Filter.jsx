export const Filter = ({changeFilter}) => {
  return (
    <label>
      Find contacts
      <input type="text" onChange={e => changeFilter(e.target.value)}/>
    </label>
  );
};
