<script lang="ts" module>
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	// This is sample data.
	const data = {
		user: {
			name: 'shadcn',
			email: 'm@example.com',
			avatar: '/avatars/shadcn.jpg'
		},
		teams: [
			{ name: 'Team 1', logo: ChevronsUpDownIcon, plan: 'Free' },
			{ name: 'Team 2', logo: ChevronsUpDownIcon, plan: 'Pro' },
			{ name: 'Team 3', logo: ChevronsUpDownIcon, plan: 'Enterprise' }
		]
	};
</script>

<script lang="ts">
	import AppOrgSwitch from './components/app-orgswitch/app-orgswitch.svelte';
	import AppRoutes from './components/app-routes/app-routes.svelte';
	import AppUserProfile from './components/app-userprofile/app-userprofile.svelte';
	import * as Sidebar from '$lib/components/internals/sidebar/index';
	import type { ComponentProps } from 'svelte';
	import { getRouteState } from './route-state.svelte';

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();

	const routeState = getRouteState();
</script>

<Sidebar.Root {collapsible} {...restProps}>
	<Sidebar.Header>
		<AppOrgSwitch teams={data.teams} />
	</Sidebar.Header>
	<Sidebar.Content>
		<AppRoutes name="General" routes={routeState.generalRoutes ?? []} />
		<AppRoutes name="Automation" routes={routeState.automationRoutes ?? []} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<AppUserProfile user={data.user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
