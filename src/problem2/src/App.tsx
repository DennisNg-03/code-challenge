import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import axios from "axios";
import type { Price } from "@/types/price";
import CurrencySelect from "@/components/CurrencySelect";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ArrowUpDown } from "lucide-react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const App = () => {
	const [prices, setPrices] = useState<Price[] | null>(null);
	const [fromCurrency, setFromCurrency] = useState("ETH");
	const [toCurrency, setToCurrency] = useState("USDC");
	const [inputAmount, setInputAmount] = useState("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const cleanPrices = (prices: Price[]) => {
		const map = new Map<string, Price>();

		for (const item of prices) {
			const existing = map.get(item.currency);

			// If price does not exist yet
			if (!existing) {
				map.set(item.currency, item);
				continue;
			}

			const existingDate = new Date(existing.date).getTime();
			const currentDate = new Date(item.date).getTime();

			if (currentDate > existingDate) {
				map.set(item.currency, item);
			}
		}

		// Sort prices based on currency name
		return Array.from(map.values()).sort((a, b) =>
			a.currency.localeCompare(b.currency)
		);
	};

	useEffect(() => {
		async function fetchPrices() {
			try {
				const response = await axios.get<Price[]>(
					"https://interview.switcheo.com/prices.json"
				);
				console.log("Prices fetched:", response.data);
				const cleanedPrices = cleanPrices(response.data);
				console.log("Cleaned prices:", cleanedPrices);
				setPrices(cleanedPrices);
			} catch (error) {
				console.error(error);
			}
		}

		fetchPrices();
	}, []);

	const outputAmount = useMemo(() => {
		if (!prices || !inputAmount) {
			return "";
		}

		const amount = Number(inputAmount);
		if (isNaN(amount)) return "";

		const priceMap = new Map(prices.map((p) => [p.currency, p.price]));

		const fromPrice = priceMap.get(fromCurrency);
		const toPrice = priceMap.get(toCurrency);

		if (fromPrice === undefined || toPrice === undefined) {
			return "";
		}

		const result = (amount * fromPrice) / toPrice;

		return result.toFixed(6);
	}, [inputAmount, fromCurrency, toCurrency, prices]);

	const exchangeRate = useMemo(() => {
		if (!prices) return null;

		const priceMap = new Map(prices.map((p) => [p.currency, p.price]));

		const fromPrice = priceMap.get(fromCurrency);
		const toPrice = priceMap.get(toCurrency);

		if (!fromPrice || !toPrice) return null;

		const rate = fromPrice / toPrice;

		return rate;
	}, [prices, fromCurrency, toCurrency]);

	const handleInputChange = (value: string) => {
		if (!/^\d*\.?\d*$/.test(value)) return; // Allow only numbers and a single decimal point

		if (value.length > 12) return; // Allow max 12 characters including decimal point

		setInputAmount(value);
	};

	const handleSwap = () => {
		setFromCurrency(toCurrency);
		setToCurrency(fromCurrency);
	};

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="min-h-dvh bg-background flex flex-col items-center">
				<Header />
				<main className="flex-1 flex flex-col items-center justify-center py-8">
					<Card className="w-full md:w-[60vw] max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
						<CardHeader>
							<CardTitle className="flex justify-center items-center text-lg md:text-xl font-bold">
								Currency Swap
							</CardTitle>
						</CardHeader>

						<CardContent className="space-y-6">
							<div className="space-y-2">
								<p className="text-sm text-foreground">Amount to convert</p>

								<div className="flex gap-2">
									<div className="flex-7 min-w-0">
										<Input
											value={inputAmount}
											onChange={(e) => handleInputChange(e.target.value)}
											placeholder="0.00"
										/>
									</div>

									<div className="flex-5 min-w-0">
										<CurrencySelect
											prices={prices}
											value={fromCurrency}
											onChange={setFromCurrency}
											loading={!prices}
										/>
									</div>
								</div>
							</div>

							<div className="flex flex-col items-center my-1 text-sm text-muted-foreground">
								<div className="flex justify-center">
									<Button
										type="button"
										variant="ghost"
										size="icon"
										onClick={handleSwap}
										aria-label="Swap currencies"
									>
										<ArrowUpDown className="h-4 w-4" />
									</Button>
								</div>
							</div>

							<div className="space-y-2">
								<p className="text-sm text-foreground">
									Amount after conversion
								</p>

								<div className="flex gap-2">
									<div className="flex-7 min-w-0">
										<Input
											className="flex-1"
											value={outputAmount}
											readOnly
											placeholder="0.00"
										/>
									</div>

									<div className="flex-5 min-w-0">
										<CurrencySelect
											prices={prices}
											value={toCurrency}
											onChange={setToCurrency}
											loading={!prices}
										/>
									</div>
								</div>
							</div>

							{exchangeRate && (
								<div className="flex flex-col items-center my-4 text-sm text-muted-foreground">
									<div className="mb-1 font-medium text-foreground">
										Exchange Rate:
									</div>
									<div>
										1 {fromCurrency} ≈{" "}
										<span className="font-medium text-foreground">
											{exchangeRate.toFixed(6)} {toCurrency}
										</span>
									</div>
									<div>
										5 {fromCurrency} ≈{" "}
										<span className="font-normal text-foreground">
											{(5 * exchangeRate).toFixed(6)} {toCurrency}
										</span>
									</div>
								</div>
							)}

							<div className="mt-8 mb-4">
								<Button
									className="w-full transition-transform active:scale-[0.98]"
									onClick={() => setIsDialogOpen(true)}
									disabled={!inputAmount || !outputAmount}
								>
									Confirm Swap
								</Button>
							</div>
						</CardContent>
					</Card>

					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogContent
							className="sm:max-w-100"
							onInteractOutside={(event) => {
								event.preventDefault();
							}}
							onEscapeKeyDown={(event) => {
								event.preventDefault();
							}}
						>
							<DialogHeader>
								<DialogTitle>Confirm Conversion</DialogTitle>
								<DialogDescription>
									Are you sure you want to convert{" "}
									<span className="font-medium">
										{inputAmount} {fromCurrency}
									</span>{" "}
									to{" "}
									<span className="font-medium">
										{outputAmount} {toCurrency}
									</span>
									?
								</DialogDescription>
							</DialogHeader>

							<DialogFooter className="flex justify-end gap-2">
								<Button
									variant="outline"
									onClick={() => setIsDialogOpen(false)}
									disabled={isLoading}
								>
									Cancel
								</Button>

								<Button
									onClick={() => {
										setIsLoading(true);
										// simulate backend call
										setTimeout(() => {
											setIsLoading(false);
											setIsDialogOpen(false);
											toast.promise(
												() =>
													new Promise<void>((resolve) =>
														setTimeout(() => resolve(), 300)
													),
												{
													loading: "Processing swap...",
													success: `${inputAmount} ${fromCurrency} has been converted to ${outputAmount} ${toCurrency}`,
													error: "Something went wrong. Please try again.",
												}
											);
											setInputAmount("");
										}, 1000);
									}}
								>
									{isLoading ? <Spinner className="h-4 w-4" /> : "Confirm"}
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</main>
				<Footer />
				<Toaster />
			</div>
		</ThemeProvider>
	);
};

export default App;
