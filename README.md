📚 Built a Library Book Management System using Angular Reactive Forms

This project is a Library Book Management System built using Angular Reactive Forms, designed with a strong focus on real-world architecture, robust validation, and user-friendly experience, rather than simple form submission.

🚀 Project Overview

Built a Library Book Management System using Angular Reactive Forms to manage book inventory, checkouts, returns, and inventory updates with proper validation, confirmation, and audit tracking.

The application dynamically adapts its form structure based on the selected operation, ensuring accurate data entry and preventing invalid submissions.

🔹 Features
📖 Book Management

➕ Add New Books with ISBN regex validation

🔄 Update Inventory with positive-quantity validation

📦 Book Transactions

📤 Checkout Books with borrower details and date validation

📥 Return Books with proper date constraints

✅ User Experience & Validation

Confirmation dialog before every submission

Inline validation feedback shown after field blur

Submit button disabled until all active fields are valid

Dynamic form rendering based on selected operation

🗄️ Real-World Database Design

Instead of storing everything in a single dataset, this project uses separate database collections via json-server, closely reflecting real-world backend architecture.

Built a Library Book Management System using Angular Reactive Forms with the following database structure:

books → Current inventory

checkouts → Checkout transaction history

returns → Return history

inventoryUpdates → Inventory audit logs

This design makes the system scalable, auditable, and production-ready.

🛠️ Tech Stack

Angular (Standalone Components)

Reactive Forms

Custom Validators

Tailwind CSS (clean, user-friendly UI)

json-server (db.json) for mock backend

RxJS (BehaviorSubject) for real-time state updates

🧠 Key Learnings

This project helped me gain hands-on experience with:

Dynamic Reactive Forms in Angular

Validation strategies and UX feedback patterns

Real-world data modeling and separation of concerns

State management using RxJS

Building scalable and maintainable frontend architecture

These are the kinds of considerations that matter in real applications, not just demos.

🤝 Feedback & Contributions

Feedback, suggestions, and discussions are always welcome!
Feel free to open an issue or submit a pull request.

🏷️ Keywords

Angular · Reactive Forms · Tailwind CSS · RxJS · json-server · Frontend Development · Web Development · Software Engineering · Portfolio Project
