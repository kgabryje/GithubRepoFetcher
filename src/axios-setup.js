import axios from 'axios';

export default axios.create({
    headers: {'Accept': 'application/vnd.github.v3+json'}
});