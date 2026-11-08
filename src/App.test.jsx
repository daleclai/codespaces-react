import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders the dog gallery and filters by group', async () => {
  const { container } = render(<App />);
  expect(screen.getByRole('heading', { name: /the world is better with dogs in it/i })).toBeDefined();
  expect(screen.getAllByRole('article')).toHaveLength(8);
  expect(container.querySelectorAll('.parade-dog')).toHaveLength(3);
  expect(container.querySelector('.dog-parade').getAttribute('aria-hidden')).toBe('true');

  await userEvent.click(screen.getByRole('button', { name: 'Little legends' }));
  expect(screen.getAllByRole('article')).toHaveLength(3);
  expect(screen.getByRole('heading', { name: 'Pip' })).toBeDefined();
});

test('changes the page background to a random light color', async () => {
  vi.spyOn(Math, 'random').mockReturnValue(0.5);
  const { container } = render(<App />);

  await userEvent.click(screen.getByRole('button', { name: /change background color/i }));

  expect(container.firstChild.style.getPropertyValue('--page-background')).toBe('hsl(180 38% 91%)');
  vi.restoreAllMocks();
});

test('opens a dog profile with its description and profile details', async () => {
  render(<App />);

  await userEvent.click(screen.getByRole('link', { name: "Read Sunny's profile" }));

  expect(await screen.findByRole('heading', { name: 'Meet Sunny.' })).toBeDefined();
  expect(screen.getByText('Personality')).toBeDefined();
  expect(screen.getByText('Age')).toBeDefined();
  expect(screen.getByText('Gender')).toBeDefined();
  expect(screen.getByText('Medication history')).toBeDefined();
  expect(screen.getByText('Favorite snacks')).toBeDefined();
  expect(screen.getByText(/fictional profile details/i)).toBeDefined();

  await userEvent.click(screen.getByRole('link', { name: 'All dogs' }));
  expect(await screen.findByRole('heading', { name: /the world is better with dogs in it/i })).toBeDefined();
});

test('posts a dog with a photo and filters it by its tag', async () => {
  render(<App />);

  await userEvent.click(screen.getByRole('link', { name: 'Add a dog' }));
  expect(await screen.findByRole('heading', { name: 'Introduce your dog.' })).toBeDefined();
  await userEvent.type(screen.getByLabelText('Name'), 'Buddy');
  await userEvent.type(screen.getByLabelText('Breed'), 'Beagle');
  await userEvent.type(screen.getByLabelText('Age'), '2 years');
  await userEvent.type(screen.getByLabelText('Gender'), 'Male');
  await userEvent.selectOptions(screen.getByLabelText('Tag'), 'Outdoors');
  await userEvent.type(screen.getByLabelText('Personality'), 'Curious and ready for a walk.');
  await userEvent.type(screen.getByLabelText('Medication history'), 'None reported.');
  await userEvent.type(screen.getByLabelText('Favorite snacks'), 'Carrots');
  await userEvent.upload(
    screen.getByLabelText('Photo'),
    new File(['image data'], 'buddy.png', { type: 'image/png' }),
  );
  expect(await screen.findByRole('img', { name: 'Preview of Buddy' })).toBeDefined();
  const form = document.querySelector('.dog-form');
  expect(form.checkValidity(), form.querySelector(':invalid')?.outerHTML).toBe(true);

  await userEvent.click(screen.getByRole('button', { name: 'Post dog' }));
  expect(await screen.findByRole('heading', { name: 'Meet Buddy.' })).toBeDefined();
  await userEvent.click(screen.getByRole('link', { name: 'All dogs' }));
  await userEvent.click(await screen.findByRole('button', { name: 'Outdoors' }));

  expect(screen.getByRole('link', { name: "Read Buddy's profile" })).toBeDefined();
});
