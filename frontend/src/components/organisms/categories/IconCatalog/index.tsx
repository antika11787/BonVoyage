"use client";
import React, { useEffect, useState, useCallback } from "react";
import { icons } from "lucide-react";
import IconGrid from "@/components/molecules/IconGrid";
import SearchAtom from "@/components/atoms/search";
import tags from "@/config/tags.json";
import { useDispatch, useSelector } from "react-redux";
import { saveCategory } from "@/redux/slices/category";
import { RootState } from "@/redux/rootReducer";

const IconCatalog = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const selectedIconRedux = useSelector((state: RootState) => state.category.icon);
  const [selectedIcon, setSelectedIcon] = useState<string>(selectedIconRedux);
  const selectedColor = useSelector((state: RootState) => state.category.color);
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const toPascalCase = useCallback((str: string) => {
    return str
      .replace(/-./g, (match) => match.charAt(1).toUpperCase())
      .replace(/^./, (match) => match.toUpperCase());
  }, []);

  const toKebabCase = useCallback((str: string) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
      .toLowerCase();
  }, []);

  const searchKey = useCallback(
    (term: string, data: any) => {
      if (!term) return [];
      return Object.keys(data)
        .filter((key) =>
          data[key].some((tag: string) =>
            tag.toLowerCase().includes(term.toLowerCase())
          )
        )
        .map(toPascalCase);
    },
    [toPascalCase]
  );

  const filteredKeys = searchKey(debouncedSearch, tags);

  const filteredIcons = Object.entries(icons).filter(
    ([name]) =>
      filteredKeys.includes(name) ||
      name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const onSelectIcon = useCallback(
    (name: string) => {
      setSelectedIcon(name);
      dispatch(
        saveCategory({
          icon: name,
        })
      );
    },
    [toKebabCase]
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <SearchAtom
        value={search}
        onChange={handleSearch}
        className="mx-[21px] mb-[21px]"
      />
      <IconGrid
        iconsList={filteredIcons}
        onSelect={onSelectIcon}
        className="pb-[110px] px-[21px]"
        selected={selectedIcon}
        colorSelected={selectedColor && selectedColor}
      />
    </div>
  );
};

export default IconCatalog;
