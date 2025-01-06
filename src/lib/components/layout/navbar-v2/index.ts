import Root from './navbar.svelte';
import Item from './item.svelte';
import List from './list.svelte';
import Dropdown from './dropdown.svelte';
import DropdownItem from './dropdown-item.svelte';
import CtaItem from './cta-item.svelte';
import { writable, type Writable } from 'svelte/store';

export const itemStyle =
	'md:px-3 py-6 md:py-2 md:rounded-md duration-300 w-full border-b md:border-none md:hover:bg-base-950/10 underline-offset-2';
export const itemStyleScrolled = '';
export const dropdownItemStyle =
	'md:px-4 py-4 md:py-6 inline-block md:flex justify-between gap-4 items-center md:py-1 md:rounded-md duration-300 w-full md:border-none md:hover:bg-base-950/5 underline-offset-2';
type NavState = {
	scrolled: boolean;
	visible: boolean;
	mobileExpanded: boolean;
	dropdown: string | null;
};

export const navState: Writable<NavState> = writable({
	scrolled: false,
	visible: true,
	mobileExpanded: false,
	dropdown: null
});

export {
	Root,
	Item,
	List,
	Dropdown,
	DropdownItem,
	CtaItem,
	//
	Root as Navbar
};
