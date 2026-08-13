# New Location Selector Modal Design in Products Page

Create a new location selector modal for `products.html` using Tailwind CSS that matches the premium theme. The design features a Header, Body, and Footer structure and offers both live search and interactive browsing.

## Design Details
1. **Modal Layout**:
   - **Header**: Contains a location icon, title, description, and close (X) button.
   - **Body**: Includes a search bar, active breadcrumb tracker, and a split selection view.
     - *Browse Columns*: A two-column grid. Left side displays parent levels (e.g., Divisions), and the right side displays child sub-locations (e.g., Districts or Upazilas under the selected item).
   - **Footer**: Shows the current selected path and action buttons (Cancel, Confirm).
2. **Dual Mode Selection**:
   - **Interactive Column Browse**: Drilling down from Division -> District -> Upazila.
   - **Instant Search**: Autocomplete search that filters across all levels simultaneously (Division, District, or Upazila) and selects the location path in one click.
3. **Mock Data Integration**:
   - Since this is a static UI prototype, we will embed a structured local JavaScript dataset representing major locations in Bangladesh to allow immediate testability.

---

## Proposed Changes

### Products Page

#### [MODIFY] [products.html](file:///d:/Installation/laragon/www/asset-sheba/about/asset-sheba-ui/products.html)
- Add the Tailwind CSS markup for the Location Selector Modal at the bottom of the body.
- Add Javascript code to:
  - Wire up modal opening and closing triggers on clicking the "Location" button in the search bar.
  - Implement dynamic rendering of the Divisions, Districts, and Upazilas in the interactive columns.
  - Implement search functionality to autocomplete and filter results instantly.
  - Update the "All Locations" search label once a user confirms their selection.

---

## Verification Plan

### Manual Verification
1. Click the **All Locations** button in the floating search bar to open the Location Modal.
2. Verify that clicking **Reset** or **Cancel** hides the modal.
3. Select a Division on the left, then select a District and Upazila on the right.
4. Verify that clicking **Confirm** closes the modal and updates the search bar label with the selected location name.
5. Search for a specific upazila (e.g. "Mirpur") in the modal's search bar, select it, and confirm the label updates.
