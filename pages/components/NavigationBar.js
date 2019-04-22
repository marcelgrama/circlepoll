import Page from '../../components/Page/';
import connectPage from '../../store/connectPage';
import NavigationBar from '../../components/NavigationBar';
import { ListItems } from '../../components/NavigationBar/Items';

const NavBarLayout = () => (
  <Page>
    <NavigationBar items={ListItems} />
  </Page>
);

export default connectPage()(NavBarLayout);
