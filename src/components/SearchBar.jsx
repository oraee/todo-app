import { Input } from 'antd';
import { debounce } from 'lodash';

const SearchBar = ({ onSearch }) => {
    const handleSearch = debounce((e) => {
        onSearch(e.target.value);
    }, 1000);

    return <Input placeholder="Search tasks..." onChange={handleSearch} />;
};

export default SearchBar;
