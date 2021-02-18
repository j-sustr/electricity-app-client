import { Component } from '@angular/core';

type NavItem = {
    label: string;
    link: string;
    icon?: string;
};

@Component({
    selector: 'app-bar',
    templateUrl: 'app-bar.component.html',
    styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent {
    items: NavItem[] = [
        {
            label: 'Costs',
            link: 'costs',
            icon: 'dx-icon-money'
        },
        {
            label: 'Power Factor',
            link: 'power-factor'
        },
        {
            label: 'Peak Demand',
            link: 'peak-demand'
        }
    ];
}
