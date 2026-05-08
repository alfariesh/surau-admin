"use client";

import {
  ArrowRightFromSquare,
  BookOpen,
  House,
  Layers,
  Persons,
  SquareArticle,
} from "@gravity-ui/icons";
import {Button} from "@heroui/react";
import {Navbar} from "@heroui-pro/react";
import {usePathname, useRouter} from "next/navigation";
import {useCallback} from "react";

const NAV_ITEMS = [
  {href: "/", icon: House, label: "Home"},
  {href: "/book", icon: BookOpen, label: "Book"},
  {href: "/feature", icon: Layers, label: "Feature"},
  {href: "/blog", icon: SquareArticle, label: "Blog"},
  {href: "/about", icon: Persons, label: "About"},
] as const;

function isCurrentPath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PublicNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const navigate = useCallback((href: string) => router.push(href), [router]);

  return (
    <Navbar
      className="border-separator/70 border-b"
      maxWidth="xl"
      navigate={navigate}
      position="sticky"
      shouldBlockScroll={false}
    >
      <Navbar.Header>
        <Navbar.MenuToggle className="md:hidden" />
        <Navbar.Brand>
          <div className="bg-accent text-accent-foreground flex size-9 items-center justify-center rounded-xl text-sm font-semibold">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-foreground text-sm font-semibold leading-tight">Surau</span>
            <span className="text-muted text-xs leading-tight">Literasi Masjid</span>
          </div>
        </Navbar.Brand>
        <Navbar.Spacer />
        <Navbar.Content className="hidden md:flex">
          {NAV_ITEMS.map((item) => (
            <Navbar.Item
              key={item.href}
              href={item.href}
              isCurrent={isCurrentPath(pathname, item.href)}
            >
              {item.label}
            </Navbar.Item>
          ))}
        </Navbar.Content>
        <Navbar.Spacer />
        <Navbar.Content>
          <Button
            className="hidden sm:inline-flex"
            size="sm"
            variant="outline"
            onPress={() => navigate("/login?next=/admin")}
          >
            Masuk Admin
          </Button>
        </Navbar.Content>
      </Navbar.Header>
      <Navbar.Menu>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <Navbar.MenuItem
              key={item.href}
              href={item.href}
              isCurrent={isCurrentPath(pathname, item.href)}
            >
              <Icon data-slot="icon" />
              {item.label}
            </Navbar.MenuItem>
          );
        })}
        <Navbar.MenuItem href="/login?next=/admin">
          <ArrowRightFromSquare data-slot="icon" />
          Masuk Admin
        </Navbar.MenuItem>
      </Navbar.Menu>
    </Navbar>
  );
}
