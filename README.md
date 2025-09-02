# Table Mockup
## Getting Started
Install packages:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run playwright test:

```bash
npm run test
```

For playwright ui mode:
```bash
npm run test-ui
```

Notes:
- In order to show the full "Select All" functionality, I have enbaled for the rows marked "Schedueled" to be selected. 
  Once "Download Selected" is clicked, only the "available" ones will be rendered in the Dialog assuming that those rows are selected.

- This project meets all the required criteria:
    - Only those that have a status of "available" are currently able to be downloaded. Your implementation should manage this.
    - The select-all checkbox should be in an unselected state if no items are selected.
    - The select-all checkbox should be in a selected state if all items are selected.
    - The select-all checkbox should be in an indeterminate state if some but not all items are selected.
    - The "Selected 2" text should reflect the count of selected items and display "None Selected" when there are none selected.
    - Clicking the select-all checkbox should select all items if none or some are selected.
    - Clicking the select-all checkbox should de-select all items if all are currently selected.
    - Status should be correctly formatted
    - Clicking "Download Selected" when some or all items are displayed should generate an alert box with the path and device of all selected files.
    - Precise/exact HTML formatting/styling to match the mockup is not required however rows should change colour when selected and on hover.

