import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { Price } from "@/types/price";

const TOKEN_ICON_BASE =
	"https://raw.githubusercontent.com/Switcheo/token-icons/c884d9c223e70c70efae3ece3dc9eaffba28ca56/tokens";

// Handle exceptions where the token symbol does not match the icon filename in the Github repo
const TOKEN_ICON_EXCEPTIONS: Record<string, string> = {
	RATOM: "rATOM.svg",
	STATOM: "stATOM.svg",
	STEVMOS: "stEVMOS.svg",
  STLUNA: "stLUNA.svg",
	STOSMO: "stOSMO.svg",
};

const getTokenIconUrl = (symbol: string) => {
  if (TOKEN_ICON_EXCEPTIONS[symbol]) {
    return `${TOKEN_ICON_BASE}/${TOKEN_ICON_EXCEPTIONS[symbol]}`;
  }
  return `${TOKEN_ICON_BASE}/${symbol}.svg`;
};

type Props = {
	prices: Price[] | null;
	value?: string;
	onChange: (value: string) => void;
	loading: boolean;
};

const CurrencySelect = ({ prices, value, onChange, loading }: Props) => {
	return (
		<Select value={value} onValueChange={onChange} disabled={loading}>
			<SelectTrigger className="w-full min-w-0">
				<SelectValue placeholder="Select currency" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Currencies</SelectLabel>
					{loading ? (
						<div className="p-2 text-sm text-muted-foreground">Loading...</div>
					) : (
						prices?.map((price) => (
							<SelectItem key={price.currency} value={price.currency}>
								<div className="flex items-center gap-2">
									<img
										src={getTokenIconUrl(price.currency)}
										alt={price.currency}
										className="h-5 w-5 rounded-full"
										onError={(e) => {
											e.currentTarget.style.display = "none";
										}}
									/>
									<span>{price.currency}</span>
								</div>
							</SelectItem>
						))
					)}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default CurrencySelect;
