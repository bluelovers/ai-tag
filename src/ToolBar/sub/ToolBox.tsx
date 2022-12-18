import { useContext } from 'solid-js';
import { Data } from '../../App';
import { Notice } from '../../utils/notice';
import { useTranslation } from '../../../i18n';
import { FloatPanel } from '../../components/FloatPanel';

export const ToolBox = () => {
    const { enMode, usersCollection, emphasizeSymbol, iconBtn } = useContext(Data);

    const { t } = useTranslation();
    return (
        <FloatPanel
            class="btn h-full bg-indigo-700"
            popup={
                <div class=" flex flex-col gap-2">
                    {/* 中英文切换符号 */}
                    <span class="btn bg-yellow-700 text-sm" onclick={() => enMode((i) => !i)}>
                        {iconBtn()
                            ? t('toolbar1.' + (enMode() ? 'en' : 'zh'))[0]
                            : t('toolbar1.' + (enMode() ? 'en' : 'zh'))}
                    </span>
                    {/* 强调括号更换 */}
                    <span
                        class="btn  bg-indigo-700   text-sm "
                        onClick={() => {
                            emphasizeSymbol((i) => (i === '{}' ? '()' : '{}'));
                            Notice.success(t('toolbar1.hint.bracketsChange'));
                        }}
                    >
                        {emphasizeSymbol().split('').join(' ')}
                    </span>
                    {/* 清空所有 TAG  */}
                    <span
                        class="btn  bg-violet-700 text-sm "
                        onClick={() => {
                            globalThis.confirm('清空所有 TAG') && usersCollection([]);
                        }}
                    >
                        清空所有 TAG
                    </span>
                </div>
            }
        >
            <span class="font-icon h-full w-full">build</span>
        </FloatPanel>
    );
};