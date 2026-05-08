"use client";

import type {NavItem} from "../nav-items";
import type {AuthUser} from "../lib/auth/types";

import {ArrowRightFromSquare} from "@gravity-ui/icons";
import {Avatar, Button, Chip} from "@heroui/react";
import {Sidebar} from "@heroui-pro/react";

import {FOOTER_ITEMS, NAV_ITEMS} from "../nav-items";

interface DashboardSidebarProps {
  pathname: string;
  basePath: string;
  user: AuthUser;
  onLogout: () => void;
  disableNavigation?: boolean;
}

export function DashboardSidebar({
  basePath,
  disableNavigation = false,
  onLogout,
  pathname,
  user,
}: DashboardSidebarProps) {
  return (
    <>
      <Sidebar>
        <SidebarContents
          basePath={basePath}
          disableNavigation={disableNavigation}
          onLogout={onLogout}
          pathname={pathname}
          user={user}
        />
      </Sidebar>
      <Sidebar.Mobile>
        <SidebarContents
          basePath={basePath}
          disableNavigation={disableNavigation}
          idPrefix="mobile-"
          onLogout={onLogout}
          pathname={pathname}
          user={user}
        />
      </Sidebar.Mobile>
    </>
  );
}

interface SidebarContentsProps {
  basePath: string;
  disableNavigation: boolean;
  user: AuthUser;
  onLogout: () => void;
  pathname: string;
  idPrefix?: string;
}

function SidebarContents({
  basePath,
  disableNavigation,
  idPrefix = "",
  onLogout,
  pathname,
  user,
}: SidebarContentsProps) {
  const displayName = user.displayName?.trim() || user.email || "Admin";
  const fallback = getInitials(displayName);

  return (
    <>
      <Sidebar.Header>
        <div className="flex items-center gap-3 px-1 py-1">
          <div className="bg-surface-secondary text-foreground flex size-9 items-center justify-center rounded-xl text-sm font-semibold">
            SA
          </div>
          <div className="flex min-w-0 flex-col" data-sidebar="label">
            <span className="text-foreground text-sm font-medium leading-tight">Surau Admin</span>
            <span className="text-muted text-xs font-medium leading-tight">Dashboard</span>
          </div>
        </div>
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Menu aria-label="Dashboard navigation">
            {NAV_ITEMS.map((item) => (
              <SidebarNavItem
                key={item.href}
                basePath={basePath}
                disableNavigation={disableNavigation}
                idPrefix={idPrefix}
                item={item}
                pathname={pathname}
              />
            ))}
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer>
        <Sidebar.Menu aria-label="Account">
          {FOOTER_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.href}
              basePath={basePath}
              disableNavigation={disableNavigation}
              idPrefix={idPrefix}
              item={item}
              pathname={pathname}
            />
          ))}
        </Sidebar.Menu>
        <div className="flex items-center gap-3 px-1 py-2">
          <Avatar className="size-9">
            {user.photoURL ? <Avatar.Image alt={displayName} src={user.photoURL} /> : null}
            <Avatar.Fallback>{fallback}</Avatar.Fallback>
          </Avatar>
          <div className="min-w-0 flex-1" data-sidebar="label">
            <p className="text-foreground truncate text-sm font-medium leading-tight">{displayName}</p>
            <p className="text-muted truncate text-xs font-medium leading-tight">{user.email}</p>
          </div>
        </div>
        <Button
          fullWidth
          className="justify-start"
          isDisabled={disableNavigation}
          type="button"
          variant="ghost"
          onPress={onLogout}
        >
          <ArrowRightFromSquare className="size-4" />
          <span data-sidebar="label">Log out</span>
        </Button>
      </Sidebar.Footer>
    </>
  );
}

function getInitials(value: string) {
  const initials = value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "AD";
}

interface SidebarNavItemProps {
  basePath: string;
  disableNavigation: boolean;
  idPrefix: string;
  item: NavItem;
  pathname: string;
}

function SidebarNavItem({
  basePath,
  disableNavigation,
  idPrefix,
  item,
  pathname,
}: SidebarNavItemProps) {
  const Icon = item.icon;
  const fullHref = basePath + item.href;
  const isCurrent =
    item.href === "/"
      ? pathname === fullHref || pathname === basePath || pathname === `${basePath}/`
      : pathname === fullHref || pathname.startsWith(`${fullHref}/`);

  return (
    <Sidebar.MenuItem
      href={disableNavigation ? undefined : fullHref}
      id={`${idPrefix}${item.href}`}
      isCurrent={isCurrent}
      textValue={item.label}
    >
      <Sidebar.MenuIcon>
        <Icon className="size-4" />
      </Sidebar.MenuIcon>
      <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
      {item.badge ? (
        <Sidebar.MenuChip>
          <Chip color="success" size="sm" variant="soft">
            {item.badge}
          </Chip>
        </Sidebar.MenuChip>
      ) : null}
    </Sidebar.MenuItem>
  );
}
