import { render, fireEvent } from '@testing-library/react';
import CreatePost from '../modals/CreatePost';

import '@testing-library/jest-dom/extend-expect';

describe('create post', () => {
  it('click create post', async () => {
    const hideModal = await jest.fn()
    const component = render(<CreatePost hideModal={hideModal} />)

    expect(component.container).toBeCalledTimes(1)
  })
})