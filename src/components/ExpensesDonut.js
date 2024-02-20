// 'use client';
import { Card, DonutChart, List, ListItem } from '@tremor/react';
import { useExpenses } from '../hooks/ExpenseContext';

export default function ExpensesDonut() {
    const { items } = useExpenses();
    return (
        <>
            <Card className="sm:mx-auto sm:max-w-lg">
                <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Total expenses by category
                </h3>
                <DonutChart
                    className="mt-8"
                    data={items}
                    category="amount"
                    index="name"
                    showTooltip={false}
                    colors={['cyan', 'blue', 'indigo', 'violet', 'fuchsia']}
                />
                <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                    <span>Category</span>
                    <span>Amount / Share</span>
                </p>
                <List className="mt-2">
                    {items.map((item) => (
                        <ListItem key={item.name} className="space-x-6">
                            <div className="flex items-center space-x-2.5 truncate">
                                <span className="truncate dark:text-dark-tremor-content-emphasis">
                                    {item.name}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    {item.amount}
                                </span>
                                <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
                                    {item.share}
                                </span>
                            </div>
                        </ListItem>
                    ))}
                </List>
            </Card>
        </>
    );
}
