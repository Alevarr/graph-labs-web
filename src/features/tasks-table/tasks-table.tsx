"use client";

import type {Selection, SortDescriptor} from "@nextui-org/react";
import type {ColumnsKey, StatusOptions, Task} from "./data";
import type {Key} from "@react-types/shared";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  RadioGroup,
  Radio,
  Chip,
  User,
  Pagination,
  Divider,
  Tooltip,
  useButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Link,
} from "@nextui-org/react";
import {SearchIcon} from "@nextui-org/shared-icons";
import React, {useMemo, useRef, useCallback, useState} from "react";
import {Icon} from "@iconify/react";
import {cn} from "@nextui-org/react";

import {CopyText} from "./copy-text";
import {EyeFilledIcon} from "./eye";
import {EditLinearIcon} from "./edit";
import {DeleteFilledIcon} from "./delete";
import {ArrowDownIcon} from "./arrow-down";
import {ArrowUpIcon} from "./arrow-up";

import {useMemoizedCallback} from "./use-memoized-callback";

import {columns, INITIAL_VISIBLE_COLUMNS, tasks} from "./data";
import {Status} from "./Status";
import { APP_ROUTES } from "@/constant/appRoutes.constant";

export default function TasksTable() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const [startDateFilter, setStartDateFilter] = React.useState("all");

  const headerColumns: {
    name: string;
    uid: string;
    info?: string;
    sortDirection?: "ascending" | "descending";
}[] = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns
      .map((item) => {
        if (item.uid === sortDescriptor.column) {
          return {
            ...item,
            sortDirection: sortDescriptor.direction,
          };
        }

        return item;
      })
      .filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns, sortDescriptor]);

  const itemFilter = useCallback(
    (col: Task) => {
      let allStartDate = startDateFilter === "all";


      return (
        (allStartDate ||
          new Date(
            new Date().getTime() -
              +(startDateFilter.match(/(\d+)(?=Days)/)?.[0] ?? 0) * 24 * 60 * 60 * 1000,
          ) <= new Date(col.startDate)) 
      );
    },
    [startDateFilter],
  );

  const filteredItems = useMemo(() => {
    let filteredTasks = [...tasks];

    if (filterValue) {
      filteredTasks = filteredTasks.filter((task) =>
        task.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    filteredTasks = filteredTasks.filter(itemFilter);

    return filteredTasks;
  }, [filterValue, itemFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Task, b: Task) => {
      const col = sortDescriptor.column as keyof Task;

      let first = a[col];
      let second = b[col];

      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const filterSelectedKeys = useMemo(() => {
    if (selectedKeys === "all") return selectedKeys;
    let resultKeys = new Set<Key>();

    if (filterValue) {
      filteredItems.forEach((item) => {
        const stringId = String(item.id);

        if ((selectedKeys as Set<string>).has(stringId)) {
          resultKeys.add(stringId);
        }
      });
    } else {
      resultKeys = selectedKeys;
    }

    return resultKeys;
  }, [selectedKeys, filteredItems, filterValue]);

  const eyesRef = useRef<HTMLButtonElement | null>(null);
  const editRef = useRef<HTMLButtonElement | null>(null);
  const deleteRef = useRef<HTMLButtonElement | null>(null);
  const {getButtonProps: getEyesProps} = useButton({ref: eyesRef});
  const {getButtonProps: getEditProps} = useButton({ref: editRef});
  const {getButtonProps: getDeleteProps} = useButton({ref: deleteRef});
  const getMemberInfoProps = useMemoizedCallback(() => ({
    onClick: handleMemberClick,
  }));

  const renderCell = useMemoizedCallback((user: Task, columnKey: React.Key) => {
    const userKey = columnKey as ColumnsKey;

    const cellValue = user[userKey as unknown as keyof Task] as string;

    switch (userKey) {
      case "id":
        return <CopyText>{cellValue}</CopyText>;
      case "name":
        return (
          <div className="text-nowrap text-small capitalize text-default-foreground">
            {cellValue}
          </div>
        );
      case "startDate":
      case "endDate":
        return (
          <div className="flex items-center gap-1">
            <Icon
              className="h-[16px] w-[16px] text-default-300"
              icon="solar:calendar-minimalistic-linear"
            />
            <p className="text-nowrap text-small capitalize text-default-foreground">
              {new Intl.DateTimeFormat("ru-RU", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(cellValue as unknown as Date)}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="flex items-center justify-end gap-2">
            <EyeFilledIcon
              {...getEyesProps()}
              className="cursor-pointer text-default-400"
              height={18}
              width={18}
            />
            <EditLinearIcon
              {...getEditProps()}
              className="cursor-pointer text-default-400"
              height={18}
              width={18}
            />
            <DeleteFilledIcon
              {...getDeleteProps()}
              className="cursor-pointer text-default-400"
              height={18}
              width={18}
            />
          </div>
        );
      default:
        return cellValue;
    }
  });

  const onNextPage = useMemoizedCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  });

  const onPreviousPage = useMemoizedCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  });

  const onSearchChange = useMemoizedCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  });

  const onSelectionChange = useMemoizedCallback((keys: Selection) => {
    if (keys === "all") {
      if (filterValue) {
        const resultKeys = new Set(filteredItems.map((item) => String(item.id)));

        setSelectedKeys(resultKeys);
      } else {
        setSelectedKeys(keys);
      }
    } else if (keys.size === 0) {
      setSelectedKeys(new Set());
    } else {
      const resultKeys = new Set<Key>();

      keys.forEach((v) => {
        resultKeys.add(v);
      });
      const selectedValue =
        selectedKeys === "all"
          ? new Set(filteredItems.map((item) => String(item.id)))
          : selectedKeys;

      selectedValue.forEach((v) => {
        if (items.some((item) => String(item.id) === v)) {
          return;
        }
        resultKeys.add(v);
      });
      setSelectedKeys(new Set(resultKeys));
    }
  });

  const topContent = useMemo(() => {
    return (
      <div className="flex items-center gap-4 overflow-auto px-[6px] py-[4px]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4">
            <Input
              className="min-w-[200px]"
              endContent={<SearchIcon className="text-default-400" width={16} />}
              placeholder="Поиск"
              size="sm"
              value={filterValue}
              onValueChange={onSearchChange}
            />
            <div>
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Button
                    className="bg-default-100 text-default-800"
                    size="sm"
                    startContent={
                      <Icon className="text-default-400" icon="solar:tuning-2-linear" width={16} />
                    }
                  >
                    Фильтр
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex w-full flex-col gap-6 px-2 py-4">
                    
                    <RadioGroup
                      label="Начало"
                      value={startDateFilter}
                      onValueChange={setStartDateFilter}
                    >
                      <Radio value="all">Все</Radio>
                      <Radio value="last7Days">7 дней назад</Radio>
                      <Radio value="last30Days">30 дней назад</Radio>
                      <Radio value="last60Days">60 дней назад</Radio>
                    </RadioGroup>
                    
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className="bg-default-100 text-default-800"
                    size="sm"
                    startContent={
                      <Icon className="text-default-400" icon="solar:sort-linear" width={16} />
                    }
                  >
                    Сортировать
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Sort"
                  items={headerColumns.filter((c) => !["actions"].includes(c.uid))}
                >
                  {(item) => (
                    <DropdownItem
                      key={item.uid}
                      onPress={() => {
                        setSortDescriptor({
                          column: item.uid,
                          direction:
                            sortDescriptor.direction === "ascending" ? "descending" : "ascending",
                        });
                      }}
                    >
                      {item.name}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div>
              <Dropdown closeOnSelect={false}>
                <DropdownTrigger>
                  <Button
                    className="bg-default-100 text-default-800"
                    size="sm"
                    startContent={
                      <Icon
                        className="text-default-400"
                        icon="solar:sort-horizontal-linear"
                        width={16}
                      />
                    }
                  >
                    Столбцы
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Columns"
                  items={columns.filter((c) => !["actions"].includes(c.uid))}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {(item) => <DropdownItem key={item.uid}>{item.name}</DropdownItem>}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <Divider className="h-5" orientation="vertical" />

          <div className="whitespace-nowrap text-sm text-default-800">
            {filterSelectedKeys === "all"
              ? "Все выбраны"
              : `${filterSelectedKeys.size} Выбрано`}
          </div>

          {(filterSelectedKeys === "all" || filterSelectedKeys.size > 0) && (
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="bg-default-100 text-default-800"
                  endContent={
                    <Icon className="text-default-400" icon="solar:alt-arrow-down-linear" />
                  }
                  size="sm"
                  variant="flat"
                >
                  Выполнить для выбранных
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Selected Actions">
                <DropdownItem key="send-email">Действие 1</DropdownItem>
                <DropdownItem key="pay-invoices">Действие 2</DropdownItem>
                <DropdownItem key="bulk-edit">Действие 3</DropdownItem>
                <DropdownItem key="end-contract">Действие 4</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    filterSelectedKeys,
    headerColumns,
    sortDescriptor,
    startDateFilter,
    setStartDateFilter,
    onSearchChange,
    setVisibleColumns,
  ]);

  const topBar = useMemo(() => {
    return (
      <div className="mb-[18px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-[700] leading-[32px]">Каталог заданий</h1>
          <Chip className="hidden items-center text-default-500 sm:flex" size="sm" variant="flat">
            {tasks.length}
          </Chip>
        </div>
        <Button as={Link} href={APP_ROUTES.admin.createTask} color="primary" endContent={<Icon icon="solar:add-circle-bold" width={20} />}>
          Добавить задание
        </Button>
      </div>
    );
  }, []);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex flex-col items-center justify-between gap-2 px-2 py-2 sm:flex-row">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="flex items-center justify-end gap-6">
          <span className="text-small text-default-400">
            {filterSelectedKeys === "all"
              ? "Все выбраны"
              : `${filterSelectedKeys.size} из ${filteredItems.length} выбрано`}
          </span>
          <div className="flex items-center gap-3">
            <Button isDisabled={page === 1} size="sm" variant="flat" onPress={onPreviousPage}>
              Назад
            </Button>
            <Button isDisabled={page === pages} size="sm" variant="flat" onPress={onNextPage}>
              Далее
            </Button>
          </div>
        </div>
      </div>
    );
  }, [filterSelectedKeys, page, pages, filteredItems.length, onPreviousPage, onNextPage]);

  const handleMemberClick = useMemoizedCallback(() => {
    setSortDescriptor({
      column: "name",
      direction: sortDescriptor.direction === "ascending" ? "descending" : "ascending",
    });
  });

  return (
    <>
      {topBar}
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          td: "before:bg-transparent",
        }}
        selectedKeys={filterSelectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={onSelectionChange}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "end" : "start"}
              className={cn([
                column.uid === "actions" ? "flex items-center justify-end px-[20px]" : "",
              ])}
            >
              {column.uid === "name" ? (
                <div
                  {...getMemberInfoProps()}
                  className="flex w-full cursor-pointer items-center justify-between"
                >
                  {column.name}
                  {column.sortDirection === "ascending" ? (
                    <ArrowUpIcon className="text-default-400" />
                  ) : (
                    <ArrowDownIcon className="text-default-400" />
                  )}
                </div>
              ) : column.info ? (
                <div className="flex min-w-[108px] items-center justify-between">
                  {column.name}
                  <Tooltip content={column.info}>
                    <Icon
                      className="text-default-300"
                      height={16}
                      icon="solar:info-circle-linear"
                      width={16}
                    />
                  </Tooltip>
                </div>
              ) : (
                column.name
              )}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
