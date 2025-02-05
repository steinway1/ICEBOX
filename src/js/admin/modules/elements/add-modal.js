import PageMsg from '../dynamic/page-msg'
import PopupBackdrop from '../dynamic/popup-backdrop'
import { __VISIBLE } from '../general/constants'
import { createElem, getTransitionTime } from '../general/utils'

class AddModal {
  constructor() {
    this.rootEl = document.querySelector('.add-popup')
    if (!this.rootEl) return
    
    this.heading = this.rootEl.querySelector('[data-add-heading]')
    this.form = this.rootEl.querySelector('form')
    this.active = false
    this.whaleId = undefined
    this.whaleName = undefined
    window.addModal = this
    this.init()
  }

  get getWhaleId() {
    return this.whaleId
  }
  get getWhaleName() {
    return this.whaleName
  }

  submitVisit() {
    let id = this.getWhaleId
    var whaleName = this.getWhaleName;
    var frm_data = $('#addVisit').serialize();
    if (id !== undefined) {
      $.ajax({
        url: '/admin/json/whale-visit?type=1&id=' + id,
        type: 'POST',
        data: frm_data,
        success: function (data) {
          var r = $.parseJSON(data);
          if (!r.error) {
            new PageMsg({
              type: 'success',
              heading: `Success!`,
              msg: `New visit for <b>${whaleName}</b> added.`,
            })
          } else {
            new PageMsg({
              type: 'error',
              heading: `Error!`,
              msg: r.msg,
            });
          }
        }
      });

    }
  }
  submitAppointment() {
    let id = this.getWhaleId
    var whaleName = this.getWhaleName;
    var frm_data = $('#addAppointment').serialize();
    if (id !== undefined) {
      $.ajax({
        url: '/admin/json/whale-visit?type=2&id=' + id,
        type: 'POST',
        data: frm_data,
        success: function (data) {
          var r = $.parseJSON(data);
          if (!r.error) {
            new PageMsg({
              type: 'success',
              heading: `Success!`,
              msg: `New appointment for <b>${whaleName}</b> added.`,
            })
          } else {
            new PageMsg({
              type: 'error',
              heading: `Error!`,
              msg: r.msg,
            });
          }
        }
      });

    }
  }

  open() {
    if (!this.active) {
      window.backdrop = new PopupBackdrop({
        callback: () => { this.close() }
      })
      this.rootEl.classList.add(__VISIBLE)
      this.active = true
    }
  }
  close() {
    if (this.active) {
      this.rootEl.classList.remove(__VISIBLE)
      this.active = false
      const backdrop = window.backdrop
      if (backdrop) backdrop.hide()
    }
  }
  setup(card, type) {
    if (!card) return
    let name = card.querySelector('.whale-card__name').textContent
    let id = type == 'visit' ? 'addVisit' : 'addAppointment'
    let whaleId = card.dataset.id.replace(/\D/g, '')

    this.whaleId = whaleId
    this.whaleName = name
    this.heading.innerHTML = `
    New ${type}:
    <span>${name}</span>
    `
    this.form.id = id
    this.form.onsubmit = (e) => {
      e.preventDefault()
      this.close()
      if (type == 'visit') {
        this.submitVisit()
      } else {
        this.submitAppointment()
      }
    }
  }

  bindEvents() {
    // Add visit
    document.addEventListener('click', (e) => {
      const target = e.target
      if (target.closest('[data-add-evt="addVisit"]')) {
        const card = target.closest('.whale-card')
        if (!card) throw new Error('Whale Card not found')
        this.open()
        this.setup(card, 'visit')
      }
    })

    // Add appointment
    document.addEventListener('click', (e) => {
      const target = e.target
      if (target.closest('[data-add-evt="addAppointment"]')) {
        const card = target.closest('.whale-card')
        if (!card) throw new Error('Whale Card not found')
        this.open()
        this.setup(card, 'appointment')
      }
    })

    // Close
    document.addEventListener('click', (e) => {
      const target = e.target
      if (target.closest('[data-add-evt="cancel"]')) {
        e.preventDefault()
        this.close()
      }
    })
  }

  init() {
    if (this.rootEl) {
      this.bindEvents()
    }
  }
}

export function initAddModal() {
  new AddModal()
}