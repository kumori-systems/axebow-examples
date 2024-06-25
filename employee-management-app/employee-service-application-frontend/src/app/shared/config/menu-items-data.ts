import { SidebarConfig } from '../interfaces/sidebar-config.interface';
import { ROUTER_DECLARATIONS } from './router-declarations';


export const MENU_ITEMS: SidebarConfig = {
    menuName: 'Menu de navegación',
    sidebarItems: [
      {
        iconName: 'people',
        label: 'Empleados',
        hasDivider: true,
        navigateTo: ROUTER_DECLARATIONS.employees
      },
      {
        iconName: 'account_balance',
        label: 'Departamentos',
        hasDivider: false,
        navigateTo: ROUTER_DECLARATIONS.departments
      }
    ]
  };