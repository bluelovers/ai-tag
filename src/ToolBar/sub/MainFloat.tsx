import { useContext } from 'solid-js';
import { Data } from '../../App';
import { useTranslation } from '../../../i18n';
import { FloatPanel, FloatPanelWithAnimate } from '@cn-ui/core';
import { MainGridOfInner } from '../../Panels/HomePanel';
import { Animate } from '@cn-ui/animate';
import { ToolBarColor } from '../ColorJar';

/** 主页面板的直接展示，免得打开太麻烦 */
export const MainFloat = () => {
    const { visibleId, iconBtn } = useContext(Data);
    const { t } = useTranslation();

    return (
        <FloatPanelWithAnimate
            animateProps={{
                extraClass: 'animate-duration-300',
                anime: 'scale',
            }}
            popup={({ show, TailwindOriginClass }) => (
                <div class="blur-background pointer-events-auto flex flex-col gap-2 rounded-md p-2">
                    <nav class="flex justify-end">
                        <div class="font-icon btn" onclick={() => visibleId('')}>
                            apps
                        </div>
                    </nav>
                    <div class="grid w-48 grid-cols-3 gap-2">
                        <MainGridOfInner></MainGridOfInner>
                    </div>
                </div>
            )}
        >
            <div class={'btn m-0 h-full  w-full ' + ToolBarColor.pick(1)}>
                {iconBtn() ? 'apps' : t('toolbar1.Home')}
            </div>
        </FloatPanelWithAnimate>
    );
};
