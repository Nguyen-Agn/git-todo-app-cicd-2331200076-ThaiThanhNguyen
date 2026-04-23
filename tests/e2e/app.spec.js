const { test, expect, _electron: electron } = require('@playwright/test');

test('End-to-end user workflow', async () => {
    // Launch the Electron app
    const electronApp = await electron.launch({ args: ['.'] });
    const window = await electronApp.firstWindow();

    const taskText = 'My new E2E test task';

    // --- TODO: Task 1: Add a new todo item ---
    // 1. Find the input field (use a locator like window.locator('#todo-input')).
    // 2. Type the `taskText` into it.
    // 3. Find and click the "Add" button.

    const text = "taskText";

    const inputField = window.locator('#todo-input')
    await inputField.fill(text);
    expect(inputField).toHaveValue(text);

    const addButton = window.locator('#add-todo-btn')
    await addButton.click({button:"left"});
    expect(inputField).toBeEmpty();


    // --- TODO: Task 2: Verify the todo item was added ---
    // 1. Locate the new todo item in the list. A good locator might be `window.locator('.todo-item')`.
    // 2. Assert that its text content contains the `taskText`.
    const item = window.locator('.todo-item');
    expect(item).toContainText(text);

    // --- TODO: Task 3: Mark the todo item as complete ---
    // 1. Find the checkbox within the new todo item.
    // 2. Click the checkbox.
    // 3. Assert that the todo item now has the 'completed' class.
    const checkbox = window.locator('.todo-item input');
    await checkbox.click({button:"left"});
    expect(checkbox).toBeChecked();

    // --- TODO: Task 4: Delete the todo item ---
    // 1. Find the delete button within the todo item.
    // 2. Click the delete button.
    // 3. Assert that the todo item is no longer visible on the page.
    const button = window.locator('.todo-item button');
    await button.click({button:"left"})
    const list = window.locator('#todo-list');
    expect(list).toBeEmpty();

    // Close the app
    await electronApp.close();
});
