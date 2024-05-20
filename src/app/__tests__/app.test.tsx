import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Home from "@/app/page";

describe("Home", () => {
  it("renders an empty basket", () => {
    render(<Home />);

    const basketButton = screen.getByRole("button", {
      name: /Basket:/i,
    });

    expect(basketButton).toHaveTextContent("Basket: 0 items");
    expect(basketButton).toBeVisible();
  });

  it("renders a basket with 1 item when an item is added", async () => {
    render(<Home />);

    const buttons = screen.getAllByRole("button", {
      name: /Add to basket/i,
    });

    await userEvent.click(buttons[0]);

    const basketButton = screen.getByRole("button", {
      name: /Basket:/i,
    });

    expect(basketButton).toHaveTextContent("Basket: 1 item");
    expect(await screen.getByText(/Item 1 count: 1$/)).toBeVisible();
    expect(await screen.getByText(/Item 2 count: 0$/)).toBeVisible();
    expect(await screen.getByText(/Item 3 count: 0$/)).toBeVisible();
    expect(await screen.getByText(/Item 4 count: 0$/)).toBeVisible();
  });

  it("renders a basket with 1 of Item 1 and 2 of Item 2", async () => {
    render(<Home />);

    const buttons = screen.getAllByRole("button", {
      name: /Add to basket/i,
    });

    await userEvent.click(buttons[0]);
    await userEvent.click(buttons[1]);
    await userEvent.click(buttons[1]);

    const basketButton = screen.getByRole("button", {
      name: /Basket:/i,
    });

    expect(basketButton).toHaveTextContent("Basket: 3 items");

    const itemCount1 = screen.getByText("Item 1 count: 1");
    const itemCount2 = screen.getByText("Item 2 count: 2");

    expect(itemCount1).toBeVisible();
    expect(itemCount2).toBeVisible();
  });

  it("updates the item count correctly when the same item is added multiple times", async () => {
    render(<Home />);

    const buttons = screen.getAllByRole("button", {
      name: /Add to basket/i,
    });

    await userEvent.click(buttons[0]);
    await userEvent.click(buttons[0]);

    const basketButton = screen.getByRole("button", {
      name: /Basket:/i,
    });

    expect(basketButton).toHaveTextContent("Basket: 2 items");

    const itemCount = screen.getByText("Item 1 count: 2");

    expect(itemCount).toBeVisible();
  });

  it("displays correct counts for all items when they are added", async () => {
    render(<Home />);

    const buttons = screen.getAllByRole("button", {
      name: /Add to basket/i,
    });

    await userEvent.click(buttons[0]);
    await userEvent.click(buttons[1]);
    await userEvent.click(buttons[2]);
    await userEvent.click(buttons[3]);

    const basketButton = screen.getByRole("button", {
      name: /Basket:/i,
    });

    expect(basketButton).toHaveTextContent("Basket: 4 items");

    const itemCount1 = screen.getByText("Item 1 count: 1");
    const itemCount2 = screen.getByText("Item 2 count: 1");
    const itemCount3 = screen.getByText("Item 3 count: 1");
    const itemCount4 = screen.getByText("Item 4 count: 1");

    expect(itemCount1).toBeVisible();
    expect(itemCount2).toBeVisible();
    expect(itemCount3).toBeVisible();
    expect(itemCount4).toBeVisible();
  });
});
