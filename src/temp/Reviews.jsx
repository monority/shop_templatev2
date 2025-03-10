export const reviews = [
	// Existing reviews
	{
	  id: 1,
	  name: "Jordan D.",
	  gender: "male",
	  message: "Consequat cupidatat officia in pariatur nulla Lorem dolor nulla duis voluptate.",
	  date: new Date("2024-12-21").getTime(),
	  email: "jordan.doe@example.com",
	  phone: "+123456789",
	  status: "Active",
	  priority: "High",
	  linkedto: "HQ4540",
	  rating: [
		{ ref: "SKU-789012", mark: "4" }, // Adidas Ultra Boost
		{ ref: "SKU-345678", mark: "5" }, // Nike Air Max 270
	  ],
	},
	{
	  id: 2,
	  name: "Emily R.",
	  gender: "unknown",
	  message: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
	  date: new Date("2024-12-22").getTime(),
	  email: "emily.rose@example.com",
	  phone: "+987654321",
	  status: "Pending",
	  priority: "Medium",
	  rating: [
		{ ref: "SKU-901234", mark: "3" }, // Puma Ignite
		{ ref: "SKU-567890", mark: "4" }, // Reebok Zig Kinetica
	  ],
	},
	// Additional existing reviews here...
	
	// New added reviews with random codeProduct references
	{
	  id: 26,
	  name: "Sarah W.",
	  gender: "female",
	  message: "I absolutely love the comfort and support this shoe provides!",
	  date: new Date("2025-02-01").getTime(),
	  email: "sarah.w@example.com",
	  phone: "+1122334455",
	  status: "Active",
	  priority: "High",
	  rating: [
		{ ref: "SKU-234567", mark: "5" }, // Converse All Star
		{ ref: "SKU-890234", mark: "4" }, // Lacoste Carnaby Evo
	  ],
	},
	{
	  id: 27,
	  name: "Alex T.",
	  gender: "male",
	  message: "The cushioning is great, but the fit was a bit tight for me.",
	  date: new Date("2025-02-03").getTime(),
	  email: "alex.t@example.com",
	  phone: "+9988776655",
	  status: "Resolved",
	  priority: "Medium",
	  rating: [
		{ ref: "SKU-890456", mark: "4" }, // Adidas NMD
		{ ref: "SKU-345012", mark: "3" }, // Jordan Retro 4
	  ],
	},
	{
	  id: 28,
	  name: "David H.",
	  gender: "male",
	  message: "Fantastic product, the design is sleek, and it performs great.",
	  date: new Date("2025-02-05").getTime(),
	  email: "david.h@example.com",
	  phone: "+1122336677",
	  status: "Pending",
	  priority: "High",
	  rating: [
		{ ref: "SKU-678901", mark: "5" }, // Under Armour HOVR Phantom
		{ ref: "SKU-567123", mark: "4" }, // Hoka One One Clifton
	  ],
	},
	{
	  id: 29,
	  name: "Emma B.",
	  gender: "female",
	  message: "These shoes are a bit too stiff at first, but they break in nicely.",
	  date: new Date("2025-02-07").getTime(),
	  email: "emma.b@example.com",
	  phone: "+3344556677",
	  status: "Active",
	  priority: "Medium",
	  rating: [
		{ ref: "SKU-234890", mark: "3" }, // Saucony Endorphin
		{ ref: "SKU-901567", mark: "5" }, // Mizuno Wave Rider 25
	  ],
	},
	{
	  id: 30,
	  name: "Mark J.",
	  gender: "male",
	  message: "I wish they had more color options, but overall a great fit.",
	  date: new Date("2025-02-10").getTime(),
	  email: "mark.j@example.com",
	  phone: "+5566778899",
	  status: "Pending",
	  priority: "Low",
	  rating: [
		{ ref: "SKU-678234", mark: "4" }, // Salomon Speedcross 5
		{ ref: "SKU-345901", mark: "4" }, // On Cloudswift
	  ],
	},
	{
	  id: 31,
	  name: "Sophia G.",
	  gender: "female",
	  message: "Perfect for daily use, comfortable and stylish!",
	  date: new Date("2025-02-12").getTime(),
	  email: "sophia.g@example.com",
	  phone: "+9988775522",
	  status: "Resolved",
	  priority: "Low",
	  rating: [
		{ ref: "SKU-123567", mark: "5" }, // Ecco Soft 7
		{ ref: "SKU-789345", mark: "3" }, // Brooks Ghost 14
	  ],
	},
	{
	  id: 32,
	  name: "James L.",
	  gender: "male",
	  message: "These are incredibly comfortable for long runs.",
	  date: new Date("2025-02-15").getTime(),
	  email: "james.l@example.com",
	  phone: "+1122339988",
	  status: "Pending",
	  priority: "High",
	  rating: [
		{ ref: "SKU-789012", mark: "4" }, // Adidas Ultra Boost
		{ ref: "SKU-678234", mark: "5" }, // Salomon Speedcross 5
	  ],
	},
	{
	  id: 33,
	  name: "Oliver N.",
	  gender: "male",
	  message: "A bit pricey, but the quality is top-notch.",
	  date: new Date("2025-02-20").getTime(),
	  email: "oliver.n@example.com",
	  phone: "+3322119988",
	  status: "Active",
	  priority: "Medium",
	  rating: [
		{ ref: "SKU-456789", mark: "4" }, // New Balance 990
		{ ref: "SKU-567890", mark: "3" }, // Reebok Zig Kinetica
	  ],
	},
	{
	  id: 34,
	  name: "Lily W.",
	  gender: "female",
	  message: "Great for everyday wear but lacked some support during runs.",
	  date: new Date("2025-02-22").getTime(),
	  email: "lily.w@example.com",
	  phone: "+3344552233",
	  status: "Resolved",
	  priority: "Low",
	  rating: [
		{ ref: "SKU-345678", mark: "3" }, // Nike Air Max 270
		{ ref: "SKU-234567", mark: "4" }, // Converse All Star
	  ],	
	},
	{
	  id: 35,
	  name: "Nathan P.",
	  gender: "male",
	  message: "The best pair of running shoes I've had so far!",
	  date: new Date("2025-02-25").getTime(),
	  email: "nathan.p@example.com",
	  phone: "+9988775566",
	  status: "Pending",
	  priority: "High",
	  rating: [
		{ ref: "SKU-890456", mark: "5" }, // Adidas NMD
		{ ref: "SKU-123890", mark: "4" }, // Nike React Infinity
	  ],
	},
  ];
  