import { createContext } from "svelte";
import SquareTerminalIcon from '@lucide/svelte/icons/square-terminal';
import HouseIcon from "@lucide/svelte/icons/House";
import ShoppingBasketIcon from "@lucide/svelte/icons/shopping-basket";
import ContainerIcon from "@lucide/svelte/icons/container";
import ShoppingCartIcon from "@lucide/svelte/icons/shopping-cart";
import ChartColumnIcon from "@lucide/svelte/icons/chart-column";
import FolderSyncIcon from "@lucide/svelte/icons/folder-sync";
import { page } from '$app/state';

export const generalRoutes = [
    {
        title: 'Home',
        url: '/app',
        icon: HouseIcon,
        isActive: false,
        childs: null
    },
    {
        title: 'Items',
        url: '/app/items',
        icon: ShoppingBasketIcon,
        isActive: false,
        childs: null
    },
    {
        title: 'Inventory',
        url: null,
        icon: ContainerIcon,
        isActive: false,
        childs: [
            {
                title: 'Inventory Adjustments',
                url: '/app/inventory',
            },
            {
                title: 'Packages',
                url: '/app/inventory/packages',
            },
            {
                title: 'Shipments',
                url: '/app/inventory/shipments',
            },
            {
                title: 'Move Orders',
                url: '/app/inventory/move-orders',
            },
            {
                title: 'Putaways',
                url: '/app/inventory/putaways',
            }
        ]
    },
    {
        title: 'Sales',
        url: null,
        icon: ShoppingCartIcon,
        isActive: false,
        childs: [
            {
                title: "Customers",
                url: '/app/sales'
            },
            {
                title: 'Sales Orders',
                url: '/app/sales/sales-orders',
            },
            {
                title: 'Invoices',
                url: '/app/sales/invoices'
            },
            {
                title: 'Sales Receipts',
                url: "/app/sales/sales-receipts"
            },
            {
                title: 'Payments Received',
                url: "/app/sales/payments-received"
            },
            {
                title: 'Sales Returns',
                url: "/app/sales/sales-returns"
            },
            {
                title: 'Credit Notes',
                url: "/app/sales/credit-notes"
            }
        ]
    }
];

export const automationRoutes = [
    {
        title: 'Reports',
        url: '/app/reports',
        icon: ChartColumnIcon,
        isActive: false,
        childs: null
    },
    {
        title: 'Documents',
        url: '/app/documents',
        icon: FolderSyncIcon,
        isActive: false,
        childs: null
    }
]


export type RouteChild = {
    title: string,
    url: string;
}

export type RouteStateType = {
    title: string,
    url: string | null,
    icon: typeof SquareTerminalIcon,
    isActive: boolean,
    childs: RouteChild[] | null
}

export class RouteState {
    #generalRoutes = $state<RouteStateType[] | null>(generalRoutes);
    #automationRoutes = $state<RouteStateType[] | null>(automationRoutes);

    set generalRoutes(routes) {
        this.#generalRoutes = routes;
    }

    get generalRoutes() {
        return this.#generalRoutes;
    }

    set automationRoutes(routes) {
        this.#automationRoutes = routes;
    }

    get automationRoutes() {
        return this.#automationRoutes;
    }

    get activeRoute() {
        const path = page.url.pathname;

        const mixedRoutes = [...(this.#generalRoutes ?? []), ...(this.#automationRoutes ?? [])];

        const foundMatch = mixedRoutes.find(route => route.url === path);

        return foundMatch ?? null;
    }

}

export const [getRouteState, setRouteState] = createContext<RouteState>();