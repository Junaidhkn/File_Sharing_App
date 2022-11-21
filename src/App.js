import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import DownloadPage from './pages/DownloadPage';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/files/download/:id">
					<DownloadPage />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
