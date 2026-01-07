import { useMemo } from "react";

interface WalletBalance {
	currency: string;
	amount: number;
	blockchain: string; // Added as it is required by logic below
	formatted?: string; // Added an optional formatted property to avoid needing a separate interface
}

// Removed the interface below
// interface FormattedWalletBalance {
//   currency: string;
//   amount: number;
//   formatted: string;
// }

interface Props {
	// Removed BoxProps as it is irrelevant in this context
	classes?: { row?: string }; // Added "classes" prop to Props
}
const WalletPage: React.FC<Props> = (props: Props) => {
	const { classes, ...rest } = props;
	// Removed the unused "children" prop destructuring since it was never used.
	// Added the "classes" prop to pass it down to the WalletRow "className" props.

	const balances: WalletBalance[] = useWalletBalances();
	// Since useWalletBalances is not defined, I assume it's a custom hook to fetch wallet balances and not making changes here
	// Explicitly typing balances enables TypeScript to infer types in filter/sort callbacks (The code will be cleaner this way.)

	const prices = usePrices(); // Since usePrices is not defined, I assume it's a custom hook to fetch prices and not making changes here

	const getPriority = (blockchain: string): number => {
		// Changed "blockchain" parameter type to string
		switch (blockchain) {
			case "Osmosis":
				return 100;
			case "Ethereum":
				return 50;
			case "Arbitrum":
				return 30;
			case "Zilliqa":
				return 20;
			case "Neo":
				return 20;
			default:
				return -99;
		}
	};

	const sortedBalances = useMemo(() => {
		return balances
			.filter(
				(balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0
			) // Fixed the inverted filter condition
			.sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain)); // Enhanced the sorting logic to increase computational efficiency
	}, [balances]); // Removed "prices" from the dependency array of the "sortedBalances" memo

	const formattedBalances = sortedBalances.map((balance) => {
		return {
			...balance,
			formatted: balance.amount.toFixed(),
		};
	});

	const rows = formattedBalances.map((balance) => {
		// Removed index parameter as it is not used
		const usdValue = (prices[balance.currency] ?? 0) * balance.amount; // Used nullish coalescing to handle undefined prices
		return (
			<WalletRow
				className={classes?.row}
				key={balance.currency} // Changed key to use balance.currency to prevent incorrect data issues upon updates on the "balances" array
				amount={balance.amount}
				usdValue={usdValue}
				formattedAmount={balance.formatted}
			/>
		);
	});

	return <div {...rest}>{rows}</div>;
};
