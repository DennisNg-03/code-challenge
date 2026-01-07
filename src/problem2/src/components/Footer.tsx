export const Footer = () => {
	return (
		<footer className="w-full pt-4 pb-8 px-6 bg-card text-card-foreground mt-10 flex flex-col sm:flex-row justify-between items-center border-t border-border">
			<span className="text-sm text-muted-foreground">
				© 2026 Dennis Ng. All rights reserved.
			</span>

			<div className="flex items-center gap-4 mt-2 sm:mt-0">
				<a
					href="#"
					className="text-muted-foreground hover:text-primary transition-colors text-sm"
				>
					Privacy Policy
				</a>
				<a
					href="#"
					className="text-muted-foreground hover:text-primary transition-colors text-sm"
				>
					Terms of Service
				</a>
			</div>
		</footer>
	);
};
