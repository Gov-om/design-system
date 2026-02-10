export type DropdownMenuItemData = {
  value: string;
  label: string;
  selected: boolean;
};

export type DeprecatedDropdownMenuItemData = {
  value?: string;
  label: string;
  selected: boolean;
  /**
   * @deprecated The `id` property will be removed in a future release in favor of `value` property
   */
  id?: string;
};
