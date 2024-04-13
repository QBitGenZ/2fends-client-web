import { faGift, faSignOut, faStore, faUser, } from '@fortawesome/free-solid-svg-icons';
import { Donation, Information, Sales, } from '~/pages';

const Sidebar = [
  {
    label: 'Thông tin',
    icon: faUser,
    path: '/',
    page: Information,
  },
  {
    label: 'Tạo quyên góp',
    icon: faGift,
    path: '/donation',
    page: Donation,
  },
  {
    label: 'Bán hàng',
    icon: faStore,
    path: '/sales',
    page: Sales,
  },
  {
    label: 'Đăng xuất',
    icon: faSignOut,
    path: '/login',
  },
];

export default Sidebar;
