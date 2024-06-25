import { RouterLink } from '@angular/router';

export interface SidebarItem {
    iconName: string;
    label: string;
    hasDivider: boolean;
    navigateTo: string;
}