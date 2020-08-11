import React from 'react';
import _Container from './Container';
import { _top } from './styles';
let containerRef;
const createSlideModal = (modals) => {
    return (props) => <_Container {...props} forwardRef={ref => containerRef = ref} modals={modals}/>;
};
export const MODAL_PADDDING_BOTTOM = _top;
export const openModal = (name, params) => containerRef && containerRef.openModal(name, params);
export const closeModal = (name) => containerRef && containerRef.closeModal(name);
export const addPrepared = (name, params) => containerRef && containerRef.addPrepared(name, params);
export const clearPrepared = (name) => containerRef && containerRef.clearPrepared(name);
export default createSlideModal;
/**
 * PanModal should be rendered only once in whole app
 * 在 panmodal中  打开modal的动画过程中最好不要有组建的重新渲染，因为borderRadius的原生渲染优先级会比react组建渲染 低，如果动画过程中有组建的更新会导致borderRadius丢帧
 * modal中可以根据传入的opened参数，来决定是否开始提交大渲染，避免出现上面的情况，可以利用opend from false to ture这一过程来提前计算渲染数据，等到opened=true时再提交更新
 * 也可以先prepare modal 这样打开modal时就只更改display属性 可以很快地再原生端渲染完成。
 */ 
