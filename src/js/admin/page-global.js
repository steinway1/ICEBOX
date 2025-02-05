import LockPin from './modules/dynamic/lock-pin'
import { getTransitionTime } from './modules/general/utils'
import PageMsg from './modules/dynamic/page-msg'
import { fakeFetchRemoveOrder } from './modules/general/fake-ajax'

/**
 * Delete Manual Order
 * @param {Event} event - The event object
 * @param {string} orderID - The ID of the order to delete
 */
export function deleteManualOrder(event, orderID) {
	new LockPin({ code: 3256, callback: deleteCallback }).push()

	async function deleteCallback() {
		const button = event.target.closest('.blank-btn')
		const orderElement = button.closest('.am-item')

		const animateDelete = () => {
			orderElement.classList.add('--remove')
			setTimeout(() => {
				orderElement.remove()
			}, getTransitionTime(orderElement));
		}
		const toggleActiveState = (state) => {
			if (button && orderElement) {
				const text = !state ? 'Deleting...' : 'Delete Order'
				button.disabled = !state
				orderElement.classList.toggle('--deleting', !state)
				button.textContent = text
			}
		}

		try {
			toggleActiveState(false)
			/**
			* @CHOU Setup here (Delete Order)
			* Need to setup function here to delete order
			*/
			const response = await fakeFetchRemoveOrder(orderID)
			if (!response.ok) {
				new PageMsg({ heading: 'Error', msg: `HTTP Error! Status: ${response.status}` })
				throw new Error(`HTTP Error! Status: ${response.status}`)
			}
			animateDelete()
		} catch (err) {
			console.error(err)
			new PageMsg({ heading: 'Error', msg: `Something went wrong: ${err.message}` })
		} finally {
			toggleActiveState(true)
		}
	}
}