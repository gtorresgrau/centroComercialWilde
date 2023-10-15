import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import ButtonWsp from '../components/Whatsapp/ButtonWsp'
import RedesSociales from './RedesSociales'
export default function Modal(props:any) {
  let [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
    props.modal(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  console.log(props)
  return (
    <>
      

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <img className='rounded shadow-lg ' src={props.product.imagen} alt="" />
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis autem alias voluptatem nisi exercitationem quasi quis dolore error molestias, voluptatibus illum amet placeat neque distinctio dolorem eos blanditiis nostrum quibusdam?
                    </p>
                  </div>

                  <div className="grid grid-cols-2 mt-4">
                    <button
                      type="button"
                      className="col-span-1 bg-transparent  hover:bg-purple text-purple font-medium hover:text-white py-0 px-3 m-3 outline outline-1  outeline- bg-purple rounded "
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                <RedesSociales />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
