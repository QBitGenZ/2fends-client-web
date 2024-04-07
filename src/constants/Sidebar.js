import { faGift, faSignOut, faStore, faUser, } from '@fortawesome/free-solid-svg-icons';
import { Donation, Information, Sales, } from '~/pages';

const Sidebar = [
  {
    label: 'Thông tin',
    icon: faUser,
    page: Information,
  },
  {
    label: 'Tạo quyên góp',
    icon: faGift,
    page: Donation,
  },
  {
    label: 'Bán hàng',
    icon: faStore,
    page: Sales,
  },
  {
    label: 'Đăng xuất',
    icon: faSignOut,
  },
];

export default Sidebar;