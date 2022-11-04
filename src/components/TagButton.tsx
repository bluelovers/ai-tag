import { Atom, atomization, reflect } from '@cn-ui/use';
import copy from 'copy-to-clipboard';
import { Component, For, useContext } from 'solid-js';
import { Data, IData } from '../App';
import { Notice } from '../utils/notice';

export const TagButton: Component<{
    data: IData;
    onClick?: (item: IData, rightClick?: boolean) => void;
    onWheel?: (item: IData, delta: number, e: Event) => void;
    en?: Atom<boolean>;
    cn?: Atom<boolean>;
}> = (props) => {
    const { showCount, enMode, MaxEmphasize, emphasizeSymbol } = useContext(Data);
    const en = atomization(props.en ?? true);
    const cn = atomization(props.cn ?? true);
    const item = props.data;
    const color = () => {
        if (item.count > 1000000) return 'bg-red-900';
        if (item.count > 100000) return 'bg-pink-900';
        if (item.count > 10000) return 'bg-amber-900';
        if (item.count > 1000) return 'bg-yellow-900';
        if (item.count > 500) return 'bg-green-900';
    };
    const emColor = ['bg-lime-800', 'bg-yellow-800', 'bg-amber-800', 'bg-orange-800', 'bg-red-800'];
    const _emColor = ['bg-cyan-700', 'bg-sky-700', 'bg-blue-700', 'bg-indigo-700', 'bg-purple-700'];
    const em = reflect(() => {
        if (props.data.emphasize === 0) return 'bg-gray-700';
        const index = Math.floor((Math.abs(props.data.emphasize) * 4) / MaxEmphasize());
        return (props.data.emphasize > 0 ? emColor : _emColor)[index];
    });
    const split = reflect(() => {
        const count = Math.abs(props.data.emphasize);

        const [left, right] = props.data.emphasize > 0 ? emphasizeSymbol() : '[]';
        return [Array(count).fill(left).join(''), Array(count).fill(right).join('')];
    });

    const contentFormat = () => {
        if (item.alternatingArr && item.alternatingArr.length)
            return (
                <div class="special-tags flex gap-1">
                    [
                    <For each={item.alternatingArr}>
                        {(item, index) => (
                            <>
                                {index() !== 0 && '|'}
                                <div>{item}</div>
                            </>
                        )}
                    </For>
                    ]
                </div>
            );
        if (item.fromTo && item.weight)
            return (
                <div class="special-tags flex gap-1">
                    [{item.fromTo[0] === '' ? item.fromTo[1] : item.fromTo.join(':')} :
                    <span class="text-purple-500">{item.weight}</span>]
                </div>
            );
        if (item.weight) {
            // console.log(item.weight);
            return (
                <div class="special-tags flex gap-1">
                    {`(${item.en}:`}
                    <span class="text-purple-500">{item.weight}</span>
                    {')'}
                </div>
            );
        }
        return (
            <>
                {cn() && <div>{item.cn}</div>}
                {en() && <div>{item.en}</div>}
            </>
        );
    };

    return (
        <nav
            class="text-col relative mx-2 my-2 flex  cursor-pointer select-none  rounded-md  px-2 py-1 text-center transition-colors active:brightness-90"
            onContextMenu={(e) => {
                e.preventDefault();
                props.onClick && props.onClick(item, true);
            }}
            onClick={() => {
                props.onClick && props.onClick(item, false);
            }}
            classList={{ [em()]: true }}
            onDblClick={() => {
                copy(enMode() ? item.en : item.cn);
                Notice.success('双击单项复制魔法释放');
            }}
            onWheel={(e) => {
                /**@ts-ignore */
                const delta: number = e.wheelDelta || e.detail;
                props.onWheel &&
                    (item.alternatingArr || item.weight || item.fromTo) &&
                    props.onWheel(item, delta, e);
                return false;
            }}
            title="左点击加，右点击减，滚轮改变小数点"
            data-id={item.en}
        >
            <nav>{split()[0]}</nav>
            <main class="flex flex-col">{contentFormat()}</main>
            <nav>{split()[1]}</nav>
            {showCount() && (
                <div
                    class={
                        'pointer-events-none absolute -right-4 -top-2 rounded-lg  px-1 text-xs font-thin text-gray-400 ' +
                        color()
                    }
                >
                    {item.count}
                </div>
            )}
        </nav>
    );
};
