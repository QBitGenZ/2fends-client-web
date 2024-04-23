import { faGift, faSignOut, faStore, faUser, } from '@fortawesome/free-solid-svg-icons';
import { Donation, Information, Sales, Login, Products, Revenue, } from '~/pages';

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
    label: 'Sản phẩm tồn kho',
    icon: faStore,
    path: '/products',
    page: Products,
  },
  {
    label: 'Thống kê doanh thu',
    icon: faStore,
    path: '/revenue',
    page: Revenue,
  },
  {
    label: 'Đăng xuất',
    icon: faSignOut,
    path: '/login',
    page: Login,
  },
];

export default Sidebar;
